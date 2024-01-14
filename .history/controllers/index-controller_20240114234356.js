// const Tesseract = require('tesseract.js');
const mindee = require("mindee");
const mindeeClient = new mindee.Client(process.env.MINDEE_API_KEY);
const fs = require('fs');
const csv = require('csv-parser');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;
class indexController {
    static async formUploadImage(req, res, next) {
        res.render('index', { title: 'Express' });
    }
    static async uploadImage(req, res, next) {
        try {
            const { path } = req.file;
            const inputSource = mindeeClient.docFromPath(path);

            const apiResponse = await mindeeClient.parse(
                mindee.product.InvoiceV4,
                inputSource
            );

            res.send(apiResponse);
        }
        catch (err) {
            next(err);
        }
    }

    //TODO using tesseract
    // static async uploadImage(req, res, next) {
    //     const { path } = req.file;
    //     const { data: { text } } = await Tesseract.recognize(path, 'eng');
    //     res.send(text);
    // }


    static async formUploadCSV(req, res, next) {
        res.render('csv', { title: 'Upload CSV' });
    }

    static async uploadCSV(req, res, next) {
        try {
            if (!req.file) {
                return res.status(400).send('File CSV tidak ditemukan.');
            }
            console.log(req.file.path);

            const results = [];
            fs.createReadStream(req.file.path)
                .pipe(csv(from_line: 2))
                .on('data', (data) => {
                    const { Namaku, Nama, Namanya } = data;
                    results.push({ Namaku, Nama, Namanya });
                })
                .on('end', () => {
                    fs.unlinkSync(req.file.path);
                    results.forEach(element => {
                        console.log(element);
                    });
                    res.render('csv', { results });
                });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    }
}

module.exports = indexController;