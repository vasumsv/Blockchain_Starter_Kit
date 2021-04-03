var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
var url = require('url');
var paths = require('./paths');
var getClientEnvironment = require('./env');



function ensureSlash(path, needsSlash) {
  var hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return path + '/';
  } else {
    return path;
  }
}
 
var homepagePath = require(paths.appPackageJson).homepage;
var homepagePathname = homepagePath ? url.parse(homepagePath).pathname : '/'; 
var publicPath = ensureSlash(homepagePathname, true); 
var publicUrl = ensureSlash(homepagePathname, false);
 var env = getClientEnvironment(publicUrl);
 
if (env['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}
 
module.exports = { 
  bail: true, 
  devtool: 'source-map', 
  entry: [
    require.resolve('./polyfills'),
    paths.appIndexJs
  ],
  output: {
    
    path: paths.appBuild,
    
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
   
    publicPath: publicPath
  },
  resolve: {
    
    fallback: paths.nodePaths,
     
    extensions: ['.js', '.json', '.jsx', ''],
    alias: {
      
      'react-native': 'react-native-web'
    }
  },

  module: {
    
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: paths.appSrc
      }
    ],
    loaders: [
     
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.woff$/,
          /\.woff2$/,
          /\.(ttf|svg|eot)$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
       
      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel',
      },
     
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?importLoaders=1!postcss')
       },
       
      {
        test: /\.json$/,
        loader: 'json'
      },
       
      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
       
      {
        test: /\.woff$/,
        loader: 'file',
        query: {
          name: 'fonts/[name].[hash].[ext]'
        }
      },
      {
        test: /\.woff2$/,
        loader: 'file',
        query: {
          name: 'fonts/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(ttf|eot)$/,
        loader: 'file',
        query: {
          name: 'fonts/[name].[hash].[ext]'
        }
      }
    ]
  },

  
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9',  
        ]
      }),
    ];
  },
  plugins: [
     
    new InterpolateHtmlPlugin({
      PUBLIC_URL: publicUrl
    }),
     
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    
    new webpack.DefinePlugin(env),
    
    new webpack.optimize.OccurrenceOrderPlugin(),
     
    new webpack.optimize.DedupePlugin(),
    
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,  
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
    
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ],
  
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
