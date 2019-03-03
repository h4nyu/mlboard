import { configure } from '@storybook/vue';
import Vue from 'vue';
import "../src/index.js";


function loadStories() {
  const req = require.context("../src", true, /stories.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
