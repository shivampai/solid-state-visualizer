function drawPlane(planetype = "AB") {
    Plot3D.clearAll()
    if (planetype == 'AB') {
        for (y = 0; y <= 3; y++) {
            if ((y % 2) == 0) {
                for (z = -2; z <= 1; z++) {
                    for (x = -2; x <= 1; x++) {
                        Plot3D.sphere(x * 2 + 1, y * Math.SQRT2, z * 2 + 1, 1)
                    }
                }
            } else {
                for (z = -1; z <= 1; z++) {
                    for (x = -1; x <= 1; x++) {
                        Plot3D.sphere(x * 2, y * Math.SQRT2, z * 2, 1, 0x0000ff)
                    }
                }
            }
        }
    } else if (planetype == 'AA') {
        for (y = 0; y <= 3; y++) {
            for (z = -2; z <= 1; z++) {
                for (x = -2; x <= 1; x++) {
                    Plot3D.sphere(x * 2 + 1, y * 2, z * 2 + 1, 1)
                }
            }
        }
    }

}
