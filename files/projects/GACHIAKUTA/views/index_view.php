<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>GACHIAKUTA</title>
    <link rel="stylesheet" href="css/style.css">

    <script src="js/background.js" defer></script>
</head>
<!--
Step 1: make background image (done)
Step 2: make the title (done)
Step 3: get the image (done)
Step 3.5: make subtitle (done)
step 4: make menu (done)
step 5: make menu hovers (done)

step 6: add on the background image a blur effect 
step 6 is change of plans, lets rework the background as it is being shown on the example
step 6.1: this is way more comlicated then I thought, i have separate rows moving in contain images up and down.
step 6.2: (DONE)

step 7: add the effect on the title from the example video (done)
step 8: fix the background image so it does the scroll on separate occasions (done)
step 9: add effect to rudo (done)
step 10: fix background so the scroll keyframe doesnt reset 
-->
<body >
  <div class="bg-container">
    <div class="z-index">
        <div class="GACHIAKUTA-title-container">
            <div class="GACHIAKUTA-title"></div>
          <!-- <div class="GACHIAKUTA-subtitle"></div> -->
        </div>

        <div class="rudo-index-container">
            <div class="rudo-index"></div>
        </div>

        <div class="index-menu-container">
            <div class="index-menu">
                    <div class="start-index" onclick="window.location='list.php';"></div>
                    <div class="options-index"></div>
                    <div class="quit-index" onclick="window.location='https://www.instagram.com/reel/DP2guLcDNh4/?igsh=cnM1YjZrMWZzOWZ5';"></div>
            </div>
        </div>
      </div>
    </div>
</body>
</html>
