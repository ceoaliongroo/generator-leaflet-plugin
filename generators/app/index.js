'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');
var _ = require('lodash');

module.exports = yeoman.generators.Base.extend({

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('LeafletPlugin') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Write the name of your plugin',
      default: this._pluginName(this.appname)
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {name: this._packageName(this.props.name)}
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        {name: this._packageName(this.props.name)}
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    tasks: function () {
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath('gulpfile.js')
      );
    },

    pluginleaflet: function () {
      mkdirp.sync('dist');
      mkdirp.sync('spec');
      mkdirp.sync('lib');
      mkdirp.sync('examples');

      this.fs.copy(
        this.templatePath('src/index.js'),
        this.destinationPath('src/' + this.props.name + '.js')
      );
    }
  },

  install: function () {
    this.installDependencies();
  },

  _pluginName: function (name) {
    var _name = _.capitalize(
      _.camelCase(name
          .toLowerCase()
          .replace('leaflet', '')
      ));
    name = name.indexOf('Leaflet.') === -1 && 'Leaflet.' + _name || _name;
    return name;
  },

  _packageName: function (name) {
    name = name.indexOf('Leaflet.') === -1 && 'leaflet-' + name || name.split('Leaflet.')[1];
    return _.kebabCase(name);
  }
});
