<!DOCTYPE html>
<html>

<head>

<script>

function Validateic ( )
{
    var firstName = document.getElementById("ic");

icref = ["001", "002"];
res = ["A", "B"];
display = [];
i = 0;

while (i < icref.length) {
  if (ic === icref[i]) {
    console.log("Found it!");
    display.append(icref[i]);
    break;
  } else {
    i += 1;
  }
}

if (display.length === 0) {
  console.log("Not found");
} else {
  if (display.length !== 0) {
    console.log("Hello, your ic number is ", ic, "and your result for quiz 2 is", res[i]);
  }
}

}

</script>

</head>

<body >

   <form action="process_form.php" onsubmit="return Validateic();">
      IC Number:<br>
      <input type="text" id="ic">
      <br>
      <input type="submit" value="Submit">
   </form>

</body>
</html>