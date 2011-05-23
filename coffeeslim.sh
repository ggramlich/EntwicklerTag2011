#!/bin/bash
coffee -c -o javascript coffee/**/*.coffee
java -cp jsSlim.jar jsSlim.JsSlimService -i javascript $1

