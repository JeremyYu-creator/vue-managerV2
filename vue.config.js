module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: []
    }
  },
  rule: [
    {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }
  ]
}
