### TREZOR.io

Language export
====================

Using internationalization with Cactus
--------------------------------------

To enable internationalization for your project:

  1. ✅  Add a `locale` key to (one of your) configuration file(s)
  2. ✅  Mark strings for translation in your site (using `{% trans %}`)
  3. Run `django-admin.py makemessages --all` for all language (otherwise `-l en`) or (unsupported) `cactus messages:make` in the project root
  4. Edit the .po file that was created with translations.


