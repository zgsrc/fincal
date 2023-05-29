import os
from financial_calendar import Calendar

_cache = {}

class Exports:
    def __init__(self):
        self.calendar_class = Calendar
        self.locales = self._get_locales()

    def get_calendar(self, name):
        if name in _cache:
            return _cache[name]
        else:
            _cache[name] = Calendar(name, self._load_locale(name))
            return _cache[name]

    def _get_locales(self):
        locales_dir = os.path.join(os.path.dirname(__file__), "exchanges")
        locales = [file.replace(".js", "") for file in os.listdir(locales_dir) if file.endswith(".js")]
        for name in locales:
            self.__dict__[name] = _cache[name] = self.get_calendar(name)
        return locales

    def _load_locale(self, name):
        locales_dir = os.path.join(os.path.dirname(__file__), "exchanges", name)
        with open(locales_dir, 'r') as file:
            locale = file.read()
        return locale

    def import_locale(self, name, locale):
        self.__dict__[name] = _cache[name] = Calendar(name, locale)
        self.locales.append(name)


# exports = Exports()
