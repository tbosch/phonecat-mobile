Phonecat Mobile
===============

Description
-----------

Mobile version of Angulars sample application [phonecat](https://github.com/angular/angular-phonecat).

Technologies
------------

- jquery-mobile: Mobile Widgets
- angular: Databinding
- jasmine: Unit-Tests
- jasmine-ui: Ui-Tests
- js-test-driver: Automating Tests
- requirejs and brew maven plugin: Modules and optimization
- Maven: Overall build control


Live Versions
-------------

- Application: [http://tigbro.github.com/phonecat-mobile](http://tigbro.github.com/phonecat-mobile)
- Unit tests: [http://tigbro.github.com/phonecat-mobile/UnitSpecRunner.html](http://tigbro.github.com/phonecat-mobile/UnitSpecRunner.html)
- Ui tests: [http://tigbro.github.com/phonecat-mobile/UiSpecRunner.html](http://tigbro.github.com/phonecat-mobile/UiSpecRunner.html)


Build process
-------------
- mvn package: Will create a war with combined and optimized javascript
- mvn integration-test -Pintegration: Will execute the js-test-driver tests.