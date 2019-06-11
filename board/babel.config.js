module.exports = function (api) {
  api.cache(true);
  const plugins = [
    'macros'
  ];
  return { 
    plugins,
  };
}
