// Contador inicial para los folios
let folioCounter = 1;

// Función auxiliar para obtener el valor de un campo de entrada
function getInputValue(id, defaultValue = "No especificado") {
    const element = document.getElementById(id);
    return element ? element.value || defaultValue : defaultValue;
}

// Función para generar el PDF
async function generatePDF() {
    try {
        const { jsPDF } = window.jspdf;

        // Crear el documento PDF
        const doc = new jsPDF();

        // Datos del formulario
        const folio = `SFC${folioCounter.toString().padStart(3, '0')}`; // Formato del folio
        folioCounter++;
        const clientName = getInputValue('clientName', 'Cliente'); // Cambia el valor por defecto a 'Cliente'
        const serviceType = getInputValue('serviceType');
        const deviceClass = getInputValue('deviceClass');
        const deviceModel = getInputValue('deviceModel');
        const serialNumber = getInputValue('serialNumber');
        const repairLevel = getInputValue('repairLevel');
        const entryDate = getInputValue('entryDate');
        const exitDate = getInputValue('exitDate');
        const price = getInputValue('price');
        const paymentType = getInputValue('paymentType');
        const brand = getInputValue('brand');

        // Validación básica
        if (!clientName || !serviceType || !deviceClass || !deviceModel) {
            alert("Por favor, complete todos los campos obligatorios.");
            return;
        }

        // Encabezado del PDF
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("Astoria & Alencastre Engineering", 10, 20);
        doc.setFontSize(12);
        doc.text("Services and Technology Electronic Laboratory.", 10, 28);

        doc.setFontSize(10);
        doc.text("Folio:", 150, 20);
        doc.setTextColor(233, 30, 99); // Rojo salsa
        doc.text(folio, 170, 20);

        // Título principal
        doc.setTextColor(0, 0, 0); // Negro
        doc.setFontSize(16);
        doc.text("Recovery PRO", 10, 40);

        // Información del cliente y servicio
        doc.setFontSize(12);
        doc.text("Nombre del cliente:", 10, 50);
        doc.text(clientName, 60, 50);

        doc.text("Tipo de servicio:", 10, 60);
        doc.text(serviceType, 60, 60);

        doc.text("Clase de dispositivo:", 10, 70);
        doc.text(deviceClass, 60, 70);

        doc.text("Modelo:", 10, 80);
        doc.text(deviceModel, 60, 80);

        doc.text("Marca:", 10, 90);
        doc.text(brand, 60, 90);

        doc.text("Número de serie:", 10, 100);
        doc.text(serialNumber, 60, 100);

        doc.text("Nivel de reparación:", 10, 110);
        doc.text(repairLevel, 60, 110);

        doc.text("Fecha de entrada:", 10, 120);
        doc.text(entryDate, 60, 120);

        doc.text("Fecha de salida:", 10, 130);
        doc.text(exitDate, 60, 130);

        doc.text("Precio de la reparación:", 10, 140);
        doc.text(price, 60, 140);

        doc.text("Pago en una sola exhibición:", 10, 150);
        doc.text(paymentType, 60, 150);

        // Contrato de adhesión
        doc.setFontSize(8);
        doc.text(
            "Contrato de adhesión: IMPORTANTE. Equipos con abandono mayor a 30 días naturales serán destruidos sin responsabilidad para Recovery Pro. La revisión tiene un costo de $600 por diagnóstico y uso del laboratorio. Equipos mojados o apagados no tienen garantía. No nos hacemos responsables por información perdida.",
            10,
            170,
            { maxWidth: 190 }
        );

         // Firma del cliente
         doc.setFontSize(10);
         doc.text("Firma del cliente de conformidad", 10, 190);

        // Guardar el archivo PDF
        const sanitizedClientName = clientName.replace(/[^a-zA-Z0-9]/g, '_'); // Reemplaza caracteres no válidos
        const fileName = `${folio}-${sanitizedClientName}.pdf`;
        doc.save(fileName);
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        alert("Hubo un error al generar el PDF. Por favor, inténtelo de nuevo.");
    }
}

// Función para imprimir la página
function printPage() {
    window.print();
}

// Vincular eventos a los botones
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("generatePdf").addEventListener("click", generatePDF);
    document.getElementById("printPage").addEventListener("click", printPage);
});