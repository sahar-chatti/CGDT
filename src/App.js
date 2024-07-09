import React, { useState } from 'react';
import './App.css';


function PaymentInstallmentSystem() {
    const [nomClient, setNomClient] = useState('');
    const [montantMin, setMontantMin] = useState('');
    const [montantMax, setMontantMax] = useState('');
    const [nombreTranches, setNombreTranches] = useState('');
    const [montantGlobal, setMontantGlobal] = useState('');
    const [results, setResults] = useState('');
    const [totalCheque, setTotalCheque] = useState(0);
    const [totalEspece, setTotalEspece] = useState(0);
    const [totalTrait, setTotalTrait] = useState(0);



   
    const calculateTotalPayments = () => {
        return (
            <ul>
                <li>Cheque: {totalCheque.toFixed(2)}</li>
                <li>Espece: {totalEspece.toFixed(2)}</li>
                <li>Trait: {totalTrait.toFixed(2)}</li>
            </ul>
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (isNaN(parseFloat(montantMin)) || isNaN(parseFloat(montantMax)) || isNaN(parseInt(nombreTranches)) || isNaN(parseFloat(montantGlobal))) {
            alert('Veuillez saisir des valeurs numériques valides.');
            return;
        }

        if (parseFloat(montantMin) < 5) {
            alert('Le montant minimum ne peut pas être inférieur à 150 Dt.');
            return;
        }

        if (parseFloat(montantMax) < 150 || parseFloat(montantMax) > 5000 ) {
            alert('Le montant maximum ne peut pas être inférieur à 150 DT et supérieur à 5000 DT .');
            return;
        }

        if (parseFloat(montantMin) >= parseFloat(montantMax)) {
            alert('Le montant minimum doit être inférieur au montant maximum.');
            return;
        }
       
       
       
    let installmentAmount = parseFloat(montantGlobal) / parseInt(nombreTranches);

   
    if (installmentAmount < parseFloat(montantMin)) {
      alert('Le montant minimum de tranche est inférieur au montant minumum.');
    } else if (installmentAmount > parseFloat(montantMax)) {
      alert('Le montant minimum de tranche est supérieur au montant maximum.');
    }

        const getRandomPaymentMode = () => {
            const modes = ['cheque', 'espece', 'trait'];
            return modes[Math.floor(Math.random() * modes.length)];
        };

      
        var paymentTotals = {
            cheque: 0,
            espece: 0,
            trait: 0
        };

        var totalAmountGenerated = 0; 

        const generateFutureDate = () => {
            const today = new Date();
            let daysToAdd = Math.floor(Math.random() * 6) + 1; 
            let futureDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000);

            if (futureDate.getDay() === 0) {
                futureDate.setDate(futureDate.getDate() + 1); 
            }

            const dayNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
            const dayName = dayNames[futureDate.getDay()];

            return dayName + ' ' + futureDate.toLocaleDateString('fr-FR');
        };

        let tableRows = (
            <table>
                <thead>
                    <tr>
                        <th>Nom du client</th>
                        <th>Mode de paiement</th>
                        <th>Date de paiement</th>
                        <th>Montant de tranche</th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(parseInt(nombreTranches))].map((_, index) => {
                        const modePaiement = getRandomPaymentMode();
                        const datePaiement = generateFutureDate();

                        switch (modePaiement) {
                            case 'cheque':
                                setTotalCheque(prevTotalCheque => prevTotalCheque + installmentAmount);
                                break;
                            case 'espece':
                                setTotalEspece(prevTotalEspece => prevTotalEspece + installmentAmount);
                                break;
                            case 'trait':
                                setTotalTrait(prevTotalTrait => prevTotalTrait + installmentAmount);
                                break;
                            default:
                                break;
                        }

                        return (
                            <tr key={index}>
                                <td>{nomClient}</td>
                                <td>{modePaiement}</td>
                                <td>{datePaiement}</td>
                                <td>{installmentAmount.toFixed(2)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );

        setResults(tableRows);
    };

    return (
        <div className='container'>
            <div className='bg-form'>
                <div className='title'>
                <br></br>   
                    <h1>Système de paiement des tranches</h1>
                    <br></br>  
                </div>

                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor='nomClient'>Nom du client:</label>
                    <input type='text' id='nomClient' value={nomClient} onChange={(e) => setNomClient(e.target.value)} required />

                    <label htmlFor='montantMin'>Montant minimum:</label>
                    <input type='number' id='montantMin' value={montantMin} onChange={(e) => setMontantMin(e.target.value)} min='5' step='any' required />

                    <label htmlFor='montantMax'>Montant maximum:</label>
                    <input type='number' id='montantMax' value={montantMax} onChange={(e) => setMontantMax(e.target.value)} min='150' step='any' required />

                    <label htmlFor='nombreTranches'>Nombre de tranches:</label>
                    <input type='number' id='nombreTranches' value={nombreTranches} onChange={(e) => setNombreTranches(e.target.value)} min='1' max='35' required />

                    <label htmlFor='montantGlobal'>Montant global:</label>
                    <input type='number' id='montantGlobal' value={montantGlobal} onChange={(e) => setMontantGlobal(e.target.value)} min='0' step='any' required />
<br></br><br></br><br></br>
                    <button type='submit'>Générer</button>
                    <br></br><br></br>
                </form>
                <br></br><br></br><br></br>
                <div className='results'>
                    {results && (
                        <>
                            {results}
                            <h3>Total des paiements par mode de paiement:</h3>
                           {calculateTotalPayments()}
                        </>
                    )}
                       

                </div>
            
            </div>
            <br></br>  <br></br>
        </div>
          
    );
}

export default PaymentInstallmentSystem;
