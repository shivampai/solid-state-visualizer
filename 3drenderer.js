const Plot3D = {

    scene: null,
    camera: null,
    renderer: null,
    controls: null,

    init() {

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f5f5);

        // Camera
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.position.set(10, 10, 10);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

        document.body.appendChild(
            this.renderer.domElement
        );

        // Orbit Controls
        this.controls = new THREE.OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        this.controls.mouseButtons = {
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN
        };

        // Lights
        this.scene.add(
            new THREE.AmbientLight(
                0xffffff,
                0.8
            )
        );

        const light =
            new THREE.DirectionalLight(
                0xffffff,
                1
            );

        light.position.set(10, 20, 10);

        this.scene.add(light);

        // Helpers
        this.scene.add(
            new THREE.GridHelper(50, 50)
        );

        this.scene.add(
            new THREE.AxesHelper(5)
        );

        window.addEventListener(
            "resize",
            this.resize.bind(this)
        );

        this.animate();
    },

    resize() {

        this.camera.aspect =
            window.innerWidth /
            window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    },

    sphere(
        x,
        y,
        z,
        r = 1,
        color = 0xff0000
    ) {

        const mesh =
            new THREE.Mesh(
                new THREE.SphereGeometry(
                    r,
                    32,
                    32
                ),
                new THREE.MeshStandardMaterial({
                    color
                })
            );

        mesh.position.set(
            x,
            y,
            z
        );

        this.scene.add(mesh);

        return mesh;
    },

    cube(
        x,
        y,
        z,
        width = 1,
        height = 1,
        depth = 1,
        color = 0x66ccff,
        opacity = 1,
        segments = 1
    ) {

        const group = new THREE.Group();

        // Translucent faces
        const geometry = new THREE.BoxGeometry(
            width,
            height,
            depth,
            segments,
            segments,
            segments
        );

        const material = new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity,
            side: THREE.DoubleSide
        });

        const cube = new THREE.Mesh(
            geometry,
            material
        );

        // Black outline
        const edges = new THREE.LineSegments(
            new THREE.EdgesGeometry(geometry),
            new THREE.LineBasicMaterial({
                color: 0x000000
            })
        );

        group.add(cube);
        group.add(edges);

        group.position.set(x, y, z);

        this.scene.add(group);
        return group;
    },

    line(
        start,
        end,
        color = 0x000000
    ) {

        const geometry =
            new THREE.BufferGeometry()
                .setFromPoints([
                    start,
                    end
                ]);

        const line =
            new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({
                    color
                })
            );

        this.scene.add(line);

        return line;
    },

    path(
        points,
        color = 0x0000ff
    ) {

        const geometry =
            new THREE.BufferGeometry()
                .setFromPoints(points);

        const path =
            new THREE.Line(
                geometry,
                new THREE.LineBasicMaterial({
                    color
                })
            );

        this.scene.add(path);

        return path;
    },

    cylinder(
        start,
        end,
        radius = 0.1,
        color = 0xff00ff
    ) {

        const direction =
            new THREE.Vector3()
                .subVectors(
                    end,
                    start
                );

        const length =
            direction.length();

        const cylinder =
            new THREE.Mesh(
                new THREE.CylinderGeometry(
                    radius,
                    radius,
                    length,
                    24
                ),
                new THREE.MeshStandardMaterial({
                    color
                })
            );

        cylinder.position.copy(
            start.clone()
                .add(end)
                .multiplyScalar(0.5)
        );

        cylinder.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.normalize()
        );

        this.scene.add(cylinder);

        return cylinder;
    },

    animate() {

        requestAnimationFrame(
            this.animate.bind(this)
        );

        this.controls.update();

        this.renderer.render(
            this.scene,
            this.camera
        );
    },
    clearAll() {

        const keep = [];

        this.scene.children.forEach(obj => {

            if (
                obj.type === "GridHelper" ||
                obj.type === "AxesHelper" ||
                obj.type === "AmbientLight" ||
                obj.type === "DirectionalLight"
            ) {
                keep.push(obj);
            }

        });

        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }

        keep.forEach(obj => {
            this.scene.add(obj);
        });

    }
};
window.addEventListener("DOMContentLoaded", () => {
    Plot3D.init();
});
