console.log("Welcome to MyGNI");  

/* Home Page error in server */
function refreshPage() {
  location.reload(); // Reload the current page
}

/* Media 
Responsive design for mobile 
*/
let navbar = document.getElementById('sidebar-list')
let gni_logo2 = document.getElementById('gni-logo2')
let xmark = document.getElementById('xmark')
xmark.style.display='none';
let baricon = document.getElementById('baricon')
let logo = document.getElementsByClassName('gni-logo2')
baricon.addEventListener('touchstart',()=>{
  navbar.style.display='flex';
  gni_logo2.style.display='none';
  xmark.style.display='block';
})
xmark.addEventListener('touchstart',()=>{
  navbar.style.display='none';
xmark.style.display='none';
gni_logo2.style.display='flex';
})
/* Attendance */
document.addEventListener('DOMContentLoaded', function() {
  const attendanceDate = document.getElementById('attendanceDate');
  const attendanceStatus = document.getElementById('attendanceStatus');
  const recordAttendance = document.getElementById('recordAttendance');
  const attendanceList = document.getElementById('attendanceList');
  const attendancePercentage = document.getElementById('attendancePercentage');
  const periodInputs = Array.from(document.querySelectorAll('#period-attendance select'));

  const attendanceData = [];
  const periodAttendanceData = {};

  let isMainAttendanceRecorded = false;

  // Disable status selection by default
  attendanceStatus.disabled = true;

  // Function to enable status selection when a valid date is chosen
  attendanceDate.addEventListener('change', function() {
      attendanceStatus.disabled = false;
      isMainAttendanceRecorded = false;
  });

  recordAttendance.addEventListener('click', function() {
      // Check if the date has been selected
      if (!attendanceDate.value) {
          alert("Please select a date.");
          return;
      }

      const selectedDate = new Date(attendanceDate.value);
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set the current date's time to midnight

      // Calculate the time for the end of the current day
      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);

      if (selectedDate < currentDate) {
          alert("You cannot record attendance for past dates.");
          return;
      }

      if (selectedDate > endOfDay) {
          alert("You cannot record attendance for future dates.");
          return;
      }

      const date = attendanceDate.value;
      const status = attendanceStatus.value;

      // Record attendance data
      attendanceData.push({ date, status });

      // Update attendance list
      const li = document.createElement('li');
      li.textContent = ` ${date}, ${status}`;
      attendanceList.appendChild(li);

      // Check if attendance has been recorded for the selected date
      const hasRecordedMainAttendance = attendanceData.some(entry => entry.date === date);

      // If attendance hasn't been recorded, mark the student as "Absent"
      if (!hasRecordedMainAttendance) {
          attendanceData.push({ date, status: 'Absent' });
      } else {
          isMainAttendanceRecorded = true;
      }

      // Calculate attendance percentage
      const totalEvents = attendanceData.length;
      const presentEvents = attendanceData.filter(entry => entry.status === 'Present').length;
      const percentage = (presentEvents / totalEvents) * 100;

      attendancePercentage.textContent = `Attendance Percentage: ${percentage.toFixed(2)}%`;
  });

  // Add event listeners for period-wise attendance
  periodInputs.forEach((input, index) => {
      input.addEventListener('change', () => {
          // Check if a date has been selected and main attendance is recorded
          if (!attendanceDate.value || !isMainAttendanceRecorded) {
              alert("Please select a date and record the main attendance before recording period attendance.");
              input.selectedIndex = 0; // Reset the selection
              return;
          }

          const date = attendanceDate.value;
          const period = `Period ${index + 1}`;
          const status = input.value;

          // Calculate period-wise attendance
          calculatePeriodAttendance(date, period, status);
      });
  });

  // Calculate and display period-wise attendance
  function calculatePeriodAttendance(date, period, status) {
      if (!periodAttendanceData[date]) {
          periodAttendanceData[date] = {};
      }

      periodAttendanceData[date][period] = status;

      // Update period-wise attendance display
      displayPeriodAttendance();
  }

 
// Display period-wise attendance and percentages
function displayPeriodAttendance() {
  const periodAttendanceDiv = document.getElementById('period-attendance-list');
  let html = '';

  for (const date in periodAttendanceData) {
      html += `<p><strong>${date}:</strong></p>`;
      html += '<ul>';

      const periods = Object.keys(periodAttendanceData[date]);
      let presentCount = 0;

      for (const period of periods) {
          html += `<li>${period}: ${periodAttendanceData[date][period]}</li>`;
          if (periodAttendanceData[date][period] === 'Present') {
              presentCount++;
          }
      }

      const totalPeriods = periods.length;
      const percentage = (presentCount / totalPeriods) * 100;
      html += `<li><strong>Attendance Percentage: ${percentage.toFixed(2)}%</strong></li>`;

      html += '</ul>';
  }

  periodAttendanceDiv.innerHTML = html;
}
})

/* Resources */
  let R18_link ='https://chat.openai.com/c/8be7d36c-4853-42e9-8ae6-f56da4d6d1c6';
  let R22_link ='https://chat.openai.com/c/8be7d36c-4853-42e9-8ae6-f56da4d6d1c6';
  let resources_ul = document.querySelector('#resources-links-container');
  let resources_links = document.getElementById('resources-links')
    resources_ul.style.display = 'none';
    document.getElementById("mySelect").addEventListener("change", function() {
        var selectedValue = this.value;
        if (selectedValue === "R18") {
          resources_ul.style.display = 'block';
          let list = document.createElement('list')
          let a = document.createElement('a')
          list.appendChild(a)
         resources_links.appendChild(list)
         a.innerHTML = `click : ${R18_link} <br>`;
         a.href= R18_link;
         a.style.color = 'white';
         a.style.textDecoration = 'none'
         window.open(R18_link, "_blank");
        }
      });
      document.getElementById("mySelect").addEventListener("change", function() {
        var selectedValue = this.value;
        if (selectedValue === "R22") {
            resources_ul.style.display = 'block';
            let list = document.createElement('list')
            let a = document.createElement('a')
            list.appendChild(a)
           resources_links.appendChild(list)
           a.innerHTML = `click R22: ${R22_link} <br>`;
           a.href= R22_link;
           window.open(R22_link, "_blank");
           a.style.color = 'rgb(216, 175, 177)';
           a.style.textDecoration = 'none'
        }
      });

      const videoList = ['irqbmMNs2Bo', '9hVzEKZQyMU', 'XCZakSI-M0I', 'l51oFfo4lJU', '1lvaELmz_qc'];
      function searchYouTube() {
        const apiKey = 'AIzaSyCSw6ke8Z5nfwl-fU8hN-lda4i3_ZIs6-A'; // Replace with your actual API key
        const query = document.getElementById('search-query').value;
        const iframe = document.getElementById('iframe-name');
      
        // Make a request to the YouTube Data API
        fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${query}&part=snippet&type=video`)
          .then((response) => response.json())
          .then((data) => {
            // Filter the search results to match video IDs in your list
            const matchingVideos = data.items.filter((item) => embeddedVideos.includes(item.id.videoId));
      
            if (matchingVideos.length > 0) {
              // Use the first matching video's ID
              const videoId = matchingVideos[0].id.videoId;
      
              // Load the video in the iframe
              iframe.src = `https://www.youtube.com/embed/${videoId}`;
            } else {
              // Handle case where no matching videos were found
              console.log('No matching videos found.');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      