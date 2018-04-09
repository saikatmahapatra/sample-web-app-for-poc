// My App Gruntfile
module.exports = function (grunt) { // jshint ignore:line
  'use strict'

  grunt.initConfig({
    pkg   : grunt.file.readJSON('package.json'),
    watch : {
      less : {
        // Compiles less files upon saving
        files: ['assets/src/less/*.less'],
        tasks: ['less:development', 'less:production','notify:less']
      },
      js   : {
        // Compile js files upon saving
        files: ['assets/src/js/*.js'],
        tasks: ['js', 'notify:js']
      }
    },
    
	// Notify end of tasks
    notify: {
      less: {
        options: {
          title  : 'My App',
          message: 'LESS finished running'
        }
      },
      js  : {
        options: {
          title  : 'My App',
          message: 'JS bundler finished running'
        }
      },
	  svgcss  : {
        options: {
          title  : 'My App',
          message: 'Ok..Done! SVG to CSS'
        }
      }
    },
	
	// SVG to CSS content
	svgcss: {
		toCrlf: {
		  options: {
			eol: 'crlf',
			cssprefix: 'glyphicon-', // add this prefix to css class
			previewhtml: 'svg-icon-test.html' // set null|any name|nay location
		  },
		  files: {
			'assets/dist/svg_css/svg_styles.css': ['assets/src/svg/*.svg']
		  }
		}
	},	
	
	
    // 'less'-task configuration
    // This task will compile all less files upon saving to create both My App.css and My App.min.css
    less  : {
      // Development not compressed
      development  : {
        files: {
          // compilation.css  :  source.less
          'assets/dist/css/styles.css' : 'assets/src/less/styles.less'          
        }
      },
      // Production compressed version
      production   : {
        options: {
          compress: true
        },
        files  : {
          // compilation.css  :  source.less
          'assets/dist/css/styles.min.css' : 'assets/src/less/styles.less'          
        }
      }
    },
	
	//Copy 
	copy: {
	  main: {
		expand: true,
		cwd: 'assets/src/js2/',
		src: '**',
		dest: 'assets/dist/js/',
		flatten: true,
		filter: 'isFile',
	  },
	},
	
    // Uglify task info. Compress the js files.
    uglify: {
      options   : {
        mangle          : true,
        preserveComments: 'some'
      },
      production: {
        files: {
          'assets/dist/js/app.min.js': ['assets/src/js/app.js'],
          'assets/dist/js/chat_app.min.js': ['assets/src/js/chat_app.js'],
          'assets/dist/js/ajax.min.js': ['assets/src/js/ajax.js'],
        }
      }
    },

    // Concatenate JS Files
    concat: {
      options: {
        separator: '\n\n',
        banner   : '/*! My App app.js\n'
        + '* ================\n'
        + '* Main JS application file for My App v2. This file\n'
        + '* should be included in all pages. It controls some layout\n'
        + '* options and implements exclusive My App plugins.\n'
        + '*\n'
        + '* @Author  Saikat Mahapatra\n'
        + '* @Support \n'
        + '* @Email   <>\n'
        + '* @version <%= pkg.version %>\n'
        + '* @repository <%= pkg.repository.url %>\n'
        + '* @license MIT <http://opensource.org/licenses/MIT>\n'
        + '*/\n\n'
        + '// Make sure jQuery has been loaded\n'
        + 'if (typeof jQuery === \'undefined\') {\n'
        + 'throw new Error(\'My App requires jQuery\')\n'
        + '}\n\n'
      },
      dist   : {
        src : ['assets/src/js/app.js'],
        dest: 'assets/dist/js/app.js'
      }
    },

    // Replace image paths in My App without plugins
    /*replace: {
      withoutPlugins   : {
        src         : ['assets/dist/css/alt/My App-without-plugins.css'],
        dest        : 'assets/dist/css/alt/My App-without-plugins.css',
        replacements: [
          {
            from: '../img',
            to  : '../../img'
          }
        ]
      },
      withoutPluginsMin: {
        src         : ['assets/dist/css/alt/My App-without-plugins.min.css'],
        dest        : 'assets/dist/css/alt/My App-without-plugins.min.css',
        replacements: [
          {
            from: '../img',
            to  : '../../img'
          }
        ]
      }
    },*/

    // Build the documentation files
    /*includes: {
      build: {
        src    : ['*.html'], // Source files
        dest   : 'documentation/', // Destination directory
        flatten: true,
        cwd    : 'documentation/build',
        options: {
          silent     : true,
          includePath: 'documentation/build/include'
        }
      }
    },*/

    // Optimize images
    image: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd   : 'assets/src/img/',
            src   : ['**/*.{png,jpg,gif,svg,jpeg}'],
            dest  : 'assets/dist/img/'
          }
        ]
      }
    },

    // Validate JS code
    jshint: {
      options: {
        jshintrc: 'assets/src/js/.jshintrc'
      },
      grunt  : {
        options: {
          jshintrc: 'assets/src/grunt/.jshintrc'
        },
        src    : 'Gruntfile.js'
      },
      core   : {
        src: 'assets/src/js/*.js'
      }      
    },

    jscs: {
      options: {
        config: 'assets/src/js/.jscsrc'
      },
      core   : {
        src: '<%= jshint.core.src %>'
      }
    },

    // Validate CSS files
    csslint: {
      options: {
        csslintrc: 'assets/src/less/.csslintrc'
      },
      dist   : [
        'assets/dist/css/styles.css'
      ]
    },

    // Validate Bootstrap HTML
    //bootlint: {
      //options: {
        //relaxerror: ['W005']
      //},
      //files  : ['pages/**/*.html', '*.html']
   // },

    // Delete images in build directory
    // After compressing the images in the build/img dir, there is no need
    // for them
    clean: {
      build: ['assets/src/img/*']
    }
  })

  // Load all grunt tasks

  // LESS Compiler
  grunt.loadNpmTasks('grunt-contrib-less')
  // Watch File Changes
  grunt.loadNpmTasks('grunt-contrib-watch')
  // Compress JS Files
  grunt.loadNpmTasks('grunt-contrib-uglify')
  // Include Files Within HTML
  grunt.loadNpmTasks('grunt-includes')
  // Optimize images
  grunt.loadNpmTasks('grunt-image')
  // Validate JS code
  grunt.loadNpmTasks('grunt-contrib-jshint')
  grunt.loadNpmTasks('grunt-jscs')
  // Delete not needed files
  grunt.loadNpmTasks('grunt-contrib-clean')
  // Lint CSS
  grunt.loadNpmTasks('grunt-contrib-csslint')
  // Lint Bootstrap
  grunt.loadNpmTasks('grunt-bootlint')
  // Concatenate JS files
  grunt.loadNpmTasks('grunt-contrib-concat')
  // Notify
  grunt.loadNpmTasks('grunt-notify')
  // Replace
  grunt.loadNpmTasks('grunt-text-replace')
  // Copy
  grunt.loadNpmTasks('grunt-contrib-copy');
  // SVG to CSS Content
  grunt.loadNpmTasks('grunt-svg-css');
  
  
  // Linting task
  grunt.registerTask('lint', ['jshint', 'csslint', 'bootlint'])
  // JS task
  grunt.registerTask('js', ['copy', 'concat', 'uglify'])
  // CSS Task
  grunt.registerTask('css', ['less:development', 'less:production', 'replace'])
  

  // The default task (running 'grunt' in console) is 'watch'
  grunt.registerTask('default', ['watch'])
}