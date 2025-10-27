// Journal player functionality
document.addEventListener('DOMContentLoaded', function() {
  const journalNav = document.querySelector('.journal-nav');
  const journalRecords = document.querySelectorAll('.journal-record');
  let currentRecord = null;

  // Helper function to update the UI with a record
  function updateUI(record) {
    // Update the date in the navigation
    const recordDate = record.querySelector('.date');
    const dayNumber = record.getAttribute('data-day');
    
    if (recordDate) {
      const dateCaption = journalNav.querySelector('.date-caption');
      if (dateCaption && dayNumber) {
        const day = parseInt(dayNumber, 10);
        const leftPercent = ((day - 1) / 146) * 80;
        
        // Set position first
        dateCaption.style.left = `${leftPercent}%`;
        
        // Update text after the next frame to allow transition to start
        requestAnimationFrame(() => {
          dateCaption.textContent = recordDate.textContent;
        });
      }
    }

    // Update the journal title with the day number
    if (dayNumber) {
      const journalTitle = document.querySelector('.journal-title h2');
      if (journalTitle) {
        journalTitle.textContent = `${dayNumber}-й день в тундре`;
      }
    }
  }

  // Initialize: set a random record as the current one and update UI
  if (journalRecords.length > 0) {
    const randomIndex = Math.floor(Math.random() * journalRecords.length);
    currentRecord = journalRecords[randomIndex];
    // Set display and opacity without animation on initial load
    currentRecord.style.display = 'block';
    currentRecord.style.opacity = '1';
    updateUI(currentRecord);
  }

  if (journalNav && journalRecords.length > 1) {
    journalNav.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Select a random record that is different from the current one
      let randomRecord;
      do {
        const randomIndex = Math.floor(Math.random() * journalRecords.length);
        randomRecord = journalRecords[randomIndex];
      } while (randomRecord === currentRecord && journalRecords.length > 1);

      // Hide current record (instant)
      if (currentRecord && currentRecord !== randomRecord) {
        currentRecord.style.transition = 'none';
        currentRecord.style.opacity = '0';
        currentRecord.style.display = 'none';
      }
      
      // Update current record and UI
      currentRecord = randomRecord;
      updateUI(currentRecord);
      
      // Show new record with animation
      // Clear any previous inline styles
      randomRecord.style.transition = 'opacity 0.5s ease';
      randomRecord.style.display = 'block';
      randomRecord.style.opacity = '0';
      
      // Trigger animation in next frame
      requestAnimationFrame(() => {
        randomRecord.style.opacity = '1';
      });
    });
  }
});