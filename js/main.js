const button = document.querySelector('#button')
const audioElement = document.querySelector('#audio')

// Disable/Enable button 
function toggleButton() {
  button.disabled = !button.disabled
}
// Passing jokes to VoiceRSS Api
function tellMe(joke) {
  VoiceRSS.speech({
    key: '7ecd7ca3ae084dea86e8a10b3965d278',
    src: joke,
    hl: 'en-us',
    v: 'John',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

async function getJokes() {
  let joke = ''
  try {
    const resp = await fetch('https://v2.jokeapi.dev/joke/Programming')
    const data = await resp.json()
    
    if(data.setup) {
      joke = `${data.setup} ... ${data.delivery}`
    } else {
      joke = data.joke
    }
    // Text-to-Speech
    tellMe(joke)
    // Disble button 
    toggleButton()
  } catch(error) {
    console.log("woops error: ", error);
  }
}

// Event listeners
button.addEventListener('click', getJokes)
audioElement.addEventListener('ended', toggleButton)