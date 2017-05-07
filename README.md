# shell-viewjs

jQuery extension to show characters like shell typing

## Sample
https://demmy.jp

## Install
```
bower install jquery shell-viewjs
```

## Usage
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="bower_components/jquery/dist/jquery.min.js"></script>
    <script src="bower_components/shell-viewjs/jquery.shell-view.min.js"></script>
    <script>
        $(function() {
            $('h1').shellView()
                   .delay(500)
                   .type('echo "Hello, shell-viewjs"')
                   .delay(500)
                   .newLine()
                   .print('Hello, shell-viewjs')
                   .prompt();
        });
    </script>
</head>
<body>
    <h1></h1>
</body>
</html>
```

## Development

### Requirement
* npm

### Build
```
npm install
npm run build
```
