#!/bin/bash
coffee -c -o javascript coffee/**/*.coffee
java -Dfile.encoding=UTF-8 -cp jsSlim.jar jsSlim.JsSlimService -i javascript $1

