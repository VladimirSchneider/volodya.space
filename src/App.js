export default () => {
  console.log('On github https://github.com/vladimirschneider/volodya.space');

  const avatar = document.querySelector('.avatar');

  if (avatar) {
    avatar.addEventListener('click', () => {
      alert('High five, dude!');
    });
  }
};
