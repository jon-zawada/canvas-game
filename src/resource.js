class Resouces {
  constructor() {
    //everything we plan to download
    this.toLoad = {
      sky: "/sprites/sky.png",
      ground: "/sprites/ground.png",
      hero: "/sprites/hero-sheet.png",
      shadow: "/sprites/shadow.png"
    }
    
    //a bucket to keep all of our images
    this.images = {};

    //load each image
    Object.keys(this.load).forEach(key => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false,
      }

      img.onload = () => {
        this.images[key].isLoaded = true;
      }
    });
  }
}