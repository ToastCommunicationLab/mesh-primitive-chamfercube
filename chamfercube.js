module.exports = function(width, radius, segments) {


  var half = width / 2;
  var segmentStepSize = Math.PI / 2 / segments;

  //displacement
  var w = half-radius;

  // the 8 original vertice vectors
  var startPoints = [
    [ 1,  1,  1],
    [ 1,  1, -1],
    [ 1, -1, -1],
    [ 1, -1,  1],
    [-1,  1, -1],
    [-1,  1,  1],
    [-1, -1,  1],
    [-1, -1, -1]
  ]

  var x, y, z, v, x1, y1, z1, j, k;

  var points = [];

  function quad(x1,y1,z1, x2,y2,z2, x3,y3,z3, x4,y4,z4, invert) {
    if(!invert) {
      points.push(x1); points.push(y1); points.push(z1);
      points.push(x2); points.push(y2); points.push(z2);
      points.push(x3); points.push(y3); points.push(z3);
      
      points.push(x1); points.push(y1); points.push(z1);
      points.push(x3); points.push(y3); points.push(z3);
      points.push(x4); points.push(y4); points.push(z4);  
    } else {
      points.push(x3); points.push(y3); points.push(z3);
      points.push(x2); points.push(y2); points.push(z2);
      points.push(x1); points.push(y1); points.push(z1);
      
      points.push(x4); points.push(y4); points.push(z4);
      points.push(x3); points.push(y3); points.push(z3);
      points.push(x1); points.push(y1); points.push(z1);
    }
  }

  //cube left
  quad(
    -half, -w, -w,
    -half, w, -w,
    -half, w, w,
    -half, -w, w,
    true
  );
  //cube right
  quad(
    half, -w, -w,
    half, w, -w,
    half, w, w,
    half, -w, w
  );
  //cube front
  quad(
    -w, -w, -half,
    w, -w, -half,
    w, w, -half,
    -w, w, -half,
    true
  );
  //cube back
  quad(
    -w, -w, half,
    w, -w, half,
    w, w, half,
    -w, w, half
  );

  //cube bottom
  quad(
    -w, -half, -w,
    w, -half, -w,
    w, -half, w,
    -w, -half, w
  );
  //cube top
  quad(
    -w, half, -w,
    w, half, -w,
    w, half, w,
    -w, half, w,
    true
  );

  //edges

  for(i = 1; i < segments+1; i++) {
    x = -w - radius * Math.sin(segmentStepSize*(i-1));
    z = -w - radius * Math.cos(segmentStepSize*(i-1));
    x1 = -w - radius * Math.sin(segmentStepSize*i);
    z1 = -w - radius * Math.cos(segmentStepSize*i);
    
    quad(
      x, w, z,
      x, -w, z,
      x1, -w, z1,
      x1, w, z1
    );
    quad(
      -x, w, z,
      -x, -w, z,
      -x1, -w, z1,
      -x1, w, z1,
      true
    );
    quad(
      -x, w, -z,
      -x, -w, -z,
      -x1, -w, -z1,
      -x1, w, -z1
    );
    quad(
      x, w, -z,
      x, -w, -z,
      x1, -w, -z1,
      x1, w, -z1,
      true
    );
    
    
    quad(
      w, x, z,
      -w, x, z,
      -w, x1, z1,
      w, x1, z1,
      true
    );
    quad(
      w, -x, z,
      -w, -x, z,
      -w, -x1, z1,
      w, -x1, z1
    );
    quad(
      w, x, -z,
      -w, x, -z,
      -w, x1, -z1,
      w, x1, -z1
    );
    quad(
      w, -x, -z,
      -w, -x, -z,
      -w, -x1, -z1,
      w, -x1, -z1,
      true
    );
    
    quad(
      x, z, w,
      x, z, -w,
      x1, z1, -w,
      x1, z1, w,
      true
    );
    quad(
      -x, z, w,
      -x, z, -w,
      -x1, z1, -w,
      -x1, z1, w
    );
    quad(
      -x, -z, w,
      -x, -z, -w,
      -x1, -z1, -w,
      -x1, -z1, w,
      true
    );
    quad(
      x, -z, w,
      x, -z, -w,
      x1, -z1, -w,
      x1, -z1, w
    );
  }



  //corners
  for(var i = 0; i < 8; i++) {
    v = startPoints[i];
    x = w * v[0];
    y = w * v[1];
    z = w * v[2];
    
    for(j = 1; j < segments+1; j++) { 

      for(k = 0; k < segments; k++) {
        quad(
          x + radius * Math.cos(k*segmentStepSize) * Math.sin(j*segmentStepSize) * v[0],
          y + radius * Math.sin(k*segmentStepSize) * Math.sin(j*segmentStepSize) * v[1],
          z + radius * Math.cos(j*segmentStepSize) * v[2],
        
          x + radius * Math.cos(k*segmentStepSize) * Math.sin((j-1)*segmentStepSize) * v[0],
          y + radius * Math.sin(k*segmentStepSize) * Math.sin((j-1)*segmentStepSize) * v[1],
          z + radius * Math.cos((j-1)*segmentStepSize) * v[2],

          x + radius * Math.cos((k+1)*segmentStepSize) * Math.sin((j-1)*segmentStepSize) * v[0],
          y + radius * Math.sin((k+1)*segmentStepSize) * Math.sin((j-1)*segmentStepSize) * v[1],
          z + radius * Math.cos((j-1)*segmentStepSize) * v[2],

        	x + radius * Math.cos((k+1)*segmentStepSize) * Math.sin(j*segmentStepSize) * v[0],
          y + radius * Math.sin((k+1)*segmentStepSize) * Math.sin(j*segmentStepSize) * v[1],
          z + radius * Math.cos(j*segmentStepSize) * v[2],
          (i+1) % 2
        );
      }
    }
  }
  return points;
}
