/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as nodemailer from 'nodemailer';
import { UserEntity } from 'src/entities/user.entity';

// async..await is not allowed in global scope, must use a wrapper

/*
export const sendEmail = async (email: string, link: string) => {
  // create reusable transporter object using the default SMTP transport
  //varsayılan SMTP aktarımını kullanarak yeniden kullanılabilir taşıyıcı nesne oluşturma
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'apikey', // generated ethereal user
      pass:"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", // generated ethereal password
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: `<b>Hello world?</b> <a href="${link}">confirm Email</a>`, // html body
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
};

*/

export const  resetPasswordSendEmail= async (user: UserEntity, link: string) => {
  console.log(user);

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "startworkapi@gmail.com",
      pass:"startworkapi.34"
    },
  });

  const mailOptions = {
    from: 'startworkapi@email.com', // sender address
    to: user.email, // list of receivers
    subject: 'Subject of your email', // Subject line
    html: `<b>Şifrenizi sıfırlamak için linki tıklayınız ?</b> <a href="${link}">Reset Password Email</a>`, // html body
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log('Error ---> : ', err);
    else console.log('Info ---> :', info);
  });
};
