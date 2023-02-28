const installButton = document.querySelector('#buttonInstall');
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can install the PWA
  installButton.style.display = 'block';
});

installButton.addEventListener('click', (e) => {
  // Hide the install button, then prompt the user to install the PWA
  installButton.style.display = 'none';
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', (evt) => {
  console.log('J.A.T.E. was installed successfully!', evt);
});
