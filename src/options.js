// Saves options to chrome.storage
const defaultFinalPrompt = "All code changes have been provided. Please provide me with your code review based on all the changes, context & title provided." +
  "If no feedback is provided omit file listing. Omit review summary. Follow my instructions precisely." +
  "Answer in a markdown format only for files you know something can be done better. File: Filename and proposition for change in next line.";

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
