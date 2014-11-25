#Example

    var ChamferCube = require('mesh-primitive-chamfercube');
    
    var size = 10;
    var radius = 2;
    var segments = 5;
    
    var myCube = ChamferCube(size, radius, segments);

`myCube` is now an 1d array containing all vector components for each vertex in the generated cube. 

#See also

 - [mesh-merge-index](https://github.com/ToastCommunicationLab/mesh-merge-index)