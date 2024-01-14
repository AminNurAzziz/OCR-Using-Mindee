const Tesseract = require('tesseract.js');
const mindee = require("mindee");
const mindeeClient = new mindee.Client(process.env.MINDEE_API_KEY);

class indexController {
    static async index(req, res, next) {
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
}

module.exports = indexController;