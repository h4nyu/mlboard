import { configure } from '@storybook/vue';
import Vue from 'vue';
import App from "@/App"

function loadStories() {
  const req = require.context("../src", true, /stories.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
