var bar = new ProgressBar.SemiCircle('.progress-bar', {
    strokeWidth: 12,
    color: '#FFEA82',
    trailColor: '#00000',
    trailWidth: 16,
    easing: 'easeInOut',
    duration: 750,
    svgStyle: null,
    text: {
      value: '',
      alignToBottom: false
    },
    // Set default step function for all animate calls
    step: (state, bar) => {
      var value = Math.round(bar.value() * 420) / 10;
      if (value === 0) {
        bar.setText('');
      } else {
        bar.setText(value);
      }
      if (value < 18.5 || value > 24.9){
        bar.text.style.color = '#ff073a';
        bar.path.setAttribute('stroke', '#ff073a');
      } else {
        bar.text.style.color = '#39FF14';
        bar.path.setAttribute('stroke', '#39FF14');
      }
    }
  });

bar.text.style.fontFamily = "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
bar.text.style.fontSize = '3rem';


function calculateBMI(m, h) {
    return bmi = m / (h**2);
}


function getClassification(bmi) {
    if (bmi < 18.5){
        return "Underweight";
    } else if (bmi < 25){
        return "Normal";
    } else if (bmi < 30) {
        return "Overweight";
    } else {
        return "Obese";
    }
}


function getOptimalWeight(height) {
    const minMass = 18.5 * (height ** 2);
    const maxMass = 24.9 * (height ** 2);
    return {
        min: minMass,
        max: maxMass
    }
}


function updateForm(){
    const m = document.getElementById('mass').value;
    const h = document.getElementById('height').value;
    const bmi = calculateBMI(m, h);
    //document.getElementById('bmi').innerHTML = bmi.toFixed(1);
    document.getElementById('classification').innerHTML = "Your BMI classification: " + getClassification(bmi);
    
    const {min, max} = getOptimalWeight(h);
    if (bmi < 18.5 || bmi > 24.9){
      document.getElementById('ideal-weight').innerHTML = "Your ideal weight is between " + min.toFixed(1) + "kg and " + max.toFixed(1) + "kg";   
    } else {
      document.getElementById('ideal-weight').innerHTML = "You are a healthy weight for your height";   
    }

    bar.animate(bmi / 42.0);  // divide bmi by 42 to get the range from 0.0 to 1.0
}