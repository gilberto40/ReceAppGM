import PdfPrinter from 'pdfmake';
import fs from 'fs';

const path = process.cwd();

class PdfMaker {

    constructor() {
        this.fonts = {
            Roboto: {
                normal: path +'/src/shared/pdfmaker/robot-fonts/Roboto-Regular.ttf',
                bold: path +'/src/shared/pdfmaker/robot-fonts/Roboto-Medium.ttf',
                italics: path +'/src/shared/pdfmaker/robot-fonts/Roboto-Italic.ttf',
                bolditalics: path +'/src/shared/pdfmaker/robot-fonts/Roboto-MediumItalic.ttf'
            }
        }
    }

    async generate(content, title) {
        
        const docDefinition = {
            content: [{
                layout: 'lightHorizontalLines', // optional
                table: {
                    headerRows: 1,
                    widths: ['*', 'auto', 100],
                    body: content
                }
            }]
        }

        const printer = new PdfPrinter(this.fonts);
        const pdfDoc = printer.createPdfKitDocument(docDefinition);

        pdfDoc.pipe(fs.createWriteStream(title));
        pdfDoc.end();       
    }
}

export default PdfMaker;