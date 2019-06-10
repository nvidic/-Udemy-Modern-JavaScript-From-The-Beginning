// Listen for submit
// necu da odmah zove calculateResults jer hocu loading gif
// document.getElementById("loan-form").addEventListener('submit', calculateResults);
document.getElementById("loan-form").addEventListener('submit', function(e){
    // Hide results - iako su default sakriveni, ako jednom izracunas i onda hoces opet 
    // rezultati ce se videti
    document.getElementById('results').style.display = 'none';
    
    // Show Loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// Calculate Results

// sklanjam e posto nije vise event handler
function calculateResults(){
    // UI Vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const montlyPayment = document.getElementById('montly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    // Compute monthly payment
    const x = Math.pow(1+calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        montlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly*calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly*calculatedPayments)-principal).toFixed(2);

        // Show results
        document.getElementById('results').style.display = 'block';

        // Hide loader
        document.getElementById('loading').style.display = 'none';
    }
    else {
        showError('Check your numbers');
    }

    // takodje uklanjam i prevent default
    //e.preventDefault();
}

// Show Error
function showError(error){
    // Show results
    document.getElementById('results').style.display = 'none';

    // Hide loader
    document.getElementById('loading').style.display = 'none';


    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class 
    errorDiv.className = 'alert alert-danger';

    // Create Text Node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading);

    // Clear error after 3 secs
    setTimeout(clearError, 3000);

}

// Clear Error
function clearError(){
    document.querySelector('.alert').remove();
}

