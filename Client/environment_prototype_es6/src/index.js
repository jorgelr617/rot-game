import $ from 'jquery';
import { drawHexPointy, drawHexFlat } from './render/hex'

$(document).ready(function() {
  var canvas = document.createElement("canvas");
  canvas.width = 1000;
  canvas.height = 1000;
  document.body.appendChild(canvas);

  var context = canvas.getContext("2d");

  drawHexPointy(context, 100, 100, 20);
  drawHexFlat(context, 140, 100, 20);


});
