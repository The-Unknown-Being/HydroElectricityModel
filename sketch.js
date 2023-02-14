function setup() {
    createCanvas(1400, 700);
    turbine = new Turbine(100,100,90,0);
    shaft = new Shaft(turbine);
    generator = new Generator(shaft);
    chain = new Chain(turbine,shaft);
    transformeru = new Transformer(generator,1);
    transmission = new Transmission(transformeru);
    light = new StreetLight(transformeru,transmission);
    transformerd = new Transformer(generator,0);
    transformerd.downAdjust(transmission);
    houselights = new HouseLights(transformerd);
  }
  
  function draw() {
    background(51);
    chain.show();
    turbine.show();
    shaft.show();
    generator.show();
    transformeru.show();
    transmission.show();
    light.show();
    transformerd.show();
    transformerd.downAdjust(transmission);
    houselights.show();
  }