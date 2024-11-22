
const cargarElementos = async () => {
    try {
        // Obtener tipo de cambio EUR a USD
        const eurData = await fetch("https://open.er-api.com/v6/latest/EUR").then(res => res.json());
        const eurToUsd = eurData?.rates?.USD;
        document.getElementById("eur").textContent = eurToUsd ? eurToUsd.toFixed(2) : "Error";

        // Obtener precio de Bitcoin en USD y convertir a COP
        const btcData = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json").then(res => res.json());
        const btcToUsd = btcData?.bpi?.USD?.rate_float;
        const usdToCop = eurData?.rates?.COP;
        const btcToCop = btcToUsd && usdToCop ? btcToUsd * usdToCop : null;
        document.getElementById("bit").textContent = btcToCop ? btcToCop.toFixed(2) : "Error";

        // Obtener tipo de cambio USD a COP
        const usdData = await fetch("https://open.er-api.com/v6/latest/USD").then(res => res.json());
        const usdToCopDirect = usdData?.rates?.COP;
        document.getElementById("dolar").textContent = usdToCopDirect ? usdToCopDirect.toFixed(2) : "Error";

    } catch (error) {
        console.error("Error al cargar:", error);
        document.getElementById("eur").textContent = "Error";
        document.getElementById("bit").textContent = "Error";
        document.getElementById("dolar").textContent = "Error";
    }
};

cargarElementos();
