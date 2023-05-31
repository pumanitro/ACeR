// Saves options to chrome.storage
const defaultFinalPrompt = `All code changes have been provided. Please provide me with your code review based on all the changes, context & title provided. Answer in a markdown format. ONLY list files you know something can be done better.Format:
Filename:
Proposition of better code or hints.`;

const saveOptions = () => {
    const openai_apikey = document.getElementById('openai_apikey').value;
    const final_prompt = document.getElementById('final_prompt').value;

    chrome.storage.sync.set(
      { openai_apikey: openai_apikey, final_prompt: final_prompt },
      () => {
        // Update status to let user know options were saved.
        const status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(() => {
          status.textContent = '';
        }, 750);
      }
    );
  };

  // Restores select box and checkbox state using the preferences
  // stored in chrome.storage.
  const restoreOptions = () => {
    chrome.storage.sync.get(
      { openai_apikey: '', final_prompt: defaultFinalPrompt },
      (items) => {
        document.getElementById('openai_apikey').value = items.openai_apikey;
        document.getElementById('final_prompt').value = items.final_prompt;
      }
    );
  };

  document.addEventListener('DOMContentLoaded', restoreOptions);
  document.getElementById('save').addEventListener('click', saveOptions);
