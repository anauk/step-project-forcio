function Slider() {
    this.slideIndex = 1;
    let self = this;
    /*this.showSlides(slideIndex);*/

    this.plusSlides = function (n) {
        self.showSlides(self.slideIndex += n);
    };

    this.showSlides = function (n) {

        let slides = document.getElementsByClassName("slidershow-container__mySlides");


        if (n > slides.length) {
            self.slideIndex = 1;
        }
        if (n < 1) {
            self.slideIndex = slides.length;
        }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        slides[self.slideIndex - 1].style.display = "block";
    }

}

let slider = new Slider();
slider.showSlides();

document.getElementById('sliderButtonLeft').addEventListener('click', function() {return slider.plusSlides(-1)});
document.getElementById('sliderButtonRight').addEventListener('click', function() {return slider.plusSlides(1)});
