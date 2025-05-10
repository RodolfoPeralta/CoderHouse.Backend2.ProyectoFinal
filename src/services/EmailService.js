const nodemailer = require('nodemailer');
require("dotenv").config();

const transport = nodemailer.createTransport({
    service: "gmail",
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.AUTH_USER,
        pass: process.env.AUTH_PASSWORD
    }
});
    
class EmailService {

    // Public Methods

    // Sends an email to reset password
    static async sendResetPasswordEmail(user, token) {
        try {
            const resetLink = `http://localhost:${process.env.PORT}/reset?token=${token}&email=${encodeURIComponent(user.email)}`;

            await transport.sendMail({
                from: 'API Rest <roloperalta2@gmail.com>',
                to: user.email,
                subject: "Recuperación de Contraseña",
                html: `
                <div>
                    <h1>Recuperación de Contraseña</h1>
                    <p>Hacé clic en el siguiente botón para restablecer tu contraseña. El enlace expira en 1 hora:</p>
                    <br>
                    <a href="${resetLink}" style="margin:10px; padding:10px 20px;background:#007bff;color:white;text-decoration:none;">Restablecer contraseña</a>
                    <br>
                    <br>
                    <br>
                    <img style="width: 100px; height: auto;" src="cid:logo"/>
                </div>
                `,
                attachments:[{
                    filename: "api-logo.png",
                    path: __dirname + '/../images/api-logo.png',
                    cid:"logo"
                }]
            });
        }
        catch(error) {
            throw error;
        }
    }

    // Sends an email when a new user is registers
    static async sendUserRegisterEmail(user) {
        try {
            await transport.sendMail({
                from: 'API Rest <roloperalta2@gmail.com>',
                to: user.email,
                subject: "Registro confirmado",
                html: `
                <div>
                    <h1>Registro Confirmado</h1>
                    <p>Hola ${user.first_name} ${user.last_name},</p>
                    <p>Tu cuenta para la API Rest fue creada correctamente.</p>
                    <br>
                    <p>Tus credenciales para el ingreso son:</p>
                    <ul>
                        <li>Email: ${user.email}</li>
                        <li>Password: *********</li>
                    </ul>
                    <br>
                    <img style="width: 100px; height: auto;" src="cid:logo"/>
                </div>`,
                attachments:[{
                    filename: "api-logo.png",
                    path: __dirname + '/../images/api-logo.png',
                    cid:"logo"
                }]
            });
        }
        catch(error) {
            throw error;
        }
    }

    // Sends an email when a purchase is completed
    static async sendGeneratedTicketEmail(user, response) {
        try {

            const { ticket, notProcessed } = response;

            const purchaseStatus = notProcessed.length === 0
            ? "Completada exitosamente"
            : "Parcial realizada (algunos productos no tenían stock)";
            
            await transport.sendMail({
                from: 'API Rest <roloperalta2@gmail.com>',
                to: user.email,
                subject: "Compra realizada",
                html: `
                <div>
                    <h1>Compra Realizada</h1>
                    <h3>Estado de tu compra: ${purchaseStatus}</h3>
                    <p>Hola ${user.first_name} ${user.last_name},</p>
                    <p>Tu ticket de compra es el siguiente:</p>
                    <ul>
                        <li>Fecha y hora: ${ticket.purchase_datetime}</li>
                        <li>Código: ${ticket.code}</li>
                        <li>Total: $ ${ticket.amount}</li>
                    </ul>
                    ${notProcessed.length > 0
                        ? "<p>Algunos productos no fueron procesados por falta de stock.</p>"
                        : "<p>Todos los productos fueron procesados correctamente.</p>"}
                    <br>
                    <br>
                    <img style="width: 100px; height: auto;" src="cid:logo"/>
                </div>`,
                attachments:[{
                    filename: "api-logo.png",
                    path: __dirname + '/../images/api-logo.png',
                    cid:"logo"
                }]
            });
        }
        catch(error) {
            throw error;
        }
    }

}

module.exports = EmailService;