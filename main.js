function drawPlane1() {
    // for (y = 1; y <= 3; y++) {
        for (z = -2; z <= 2; z++) {
            for (x = -2; x <= 2; x++) {
                Plot3D.sphere(x * 2, 0, z * 2, 1, 0x0000ff)
            }
        }
    // }
    for (z = -3; z <= 2; z++) {
        for (x = -3; x <= 2; x++) {
            Plot3D.sphere(x * 2 + 1, Math.SQRT2, z * 2 + 1, 1)
        }
    }
}