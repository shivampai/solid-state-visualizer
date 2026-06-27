zCount = 2
xCount = 2
yCount = 2
function drawPlane(planetype = "AB") {
    Plot3D.clearAll()
    if (planetype == 'AB') {
        for (y = 0; y <= yCount - 1; y++) {
            if ((y % 2) == 0) {//A
                for (z = -(zCount / 2); z <= zCount / 2 - 1; z++) {
                    for (x = -(xCount / 2); x <= xCount / 2 - 1; x++) {
                        Plot3D.sphere(x * 2 + 1, y * Math.SQRT2, z * 2 + 1, 1)
                    }
                }
            } else {//B
                for (z = -(zCount / 2 - 1); z <= zCount / 2 - 1; z++) {
                    for (x = -(xCount / 2 - 1); x <= (xCount / 2 - 1); x++) {
                        Plot3D.sphere(x * 2, y * Math.SQRT2, z * 2, 1, 0x0000ff)
                    }
                }
            }
        }
    } else if (planetype == 'AA') {
        for (y = 0; y <= yCount - 1; y++) {
            for (z = -(zCount / 2); z <= zCount / 2 - 1; z++) {
                for (x = -(xCount / 2); x <= xCount / 2 - 1; x++) {
                    Plot3D.sphere(x * 2 + 1, y * 2, z * 2 + 1, 1)
                }
            }
        }
    }
}
function drawCubes() {
    Plot3D.cube(0, 1, 0, 2, 2, 2, 0x66ccff, 0.5, 5)
}
function editData() {
    xCount = Number(window.prompt('x:'))
    yCount = Number(window.prompt('y:'))
    zCount = Number(window.prompt('z:'))

    drawPlane('AA') //EDIT
}
