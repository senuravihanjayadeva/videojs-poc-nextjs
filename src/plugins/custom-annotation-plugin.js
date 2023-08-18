import videojs from 'video.js';

videojs.registerPlugin('customAnnotation', function() {
  const player = this;
  // Create a modal container
const modalContainer = document.createElement('div');
modalContainer.className = 'modal-container';
modalContainer.style.position = 'absolute';
modalContainer.style.top = '47%'; // Adjust the y-coordinate
modalContainer.style.left = '7%'; // Adjust the x-coordinate
modalContainer.style.width = '200px';
modalContainer.style.height = '250px';
modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
modalContainer.style.border = '1px solid #ffffff';
modalContainer.style.color = 'white';
modalContainer.style.display = 'none'; // Hide modal initially

let isClosed = false;
// Create a close button within the modal
const closeButton = document.createElement('button');
closeButton.className = 'modal-close-button';
// Add Video.js close icon
closeButton.innerHTML = '<span class="vjs-icon-cancel"></span>';
closeButton.addEventListener('click', () => {
  modalContainer.style.display = 'none';
  isClosed = true;
});

// Append the close button to the modal container
modalContainer.appendChild(closeButton);

// Get the start and end times for showing the modal
const startTime = 3; // Start time in seconds
const endTime = 15;   // End time in seconds

// Append modal container to player element
player.el().appendChild(modalContainer);

// Show modal at the start time
player.on('timeupdate', () => {
  const currentTime = player.currentTime();
  
  if (currentTime >= startTime && currentTime <= endTime) {
    if(!isClosed){
      modalContainer.style.display = 'block';
    }
  } else {
    modalContainer.style.display = 'none';
  }

  if(currentTime <= startTime){
    isClosed = false;
  }
});
});


