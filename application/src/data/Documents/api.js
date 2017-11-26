
import Promise from 'bluebird';

// Getting data from json to mock api.
import HTMLDoc from '@/assets/json/html.json';
import PDFDoc from '@/assets/json/pdf.json';
import '@/assets/documents/p2Zjkt12LmnF.pdf';

HTMLDoc.id = 'sdU1LoTzj89q';
PDFDoc.id = 'p2Zjkt12LmnF';

export default {
  list: () => (
    new Promise((resolve) => {
      resolve([HTMLDoc, PDFDoc]);
    })
  ),
};
