/* eslint-disable prettier/prettier */
const index = (req, res) => {
  res.render('home/index', {
    title: 'ProjNotes',
  });
};
const greeting = (req, res) => {
  res.status(200).json({
    message: 'Hola Campeon de la FullStack web',
   });
};
const about = (req, res) => {
  res.render('home/about', {
    title: 'Acerca de Projnote',
  });
};
export default {
  index,
  greeting,
  about,
};
