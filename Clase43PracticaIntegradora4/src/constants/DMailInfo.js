import __dirname from '../utils.js'
export default {
    welcome: {
        subject:"¡Bienvenido!",
        attachments: [
            {
                filename:'banner.png',
                path:`${__dirname}/public/images/erp2.png`,
                cid:"banner"
            }
        ]
    },
    newAdmin: {
        subject:"Acceso a plataforma",
        attachments: [ 
            {
                filename:'admin.png',
                path:`${__dirname}/public/images/user.png`,
                cid:'company1'
            }
        ]
    }
}