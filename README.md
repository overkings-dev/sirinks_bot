﻿# Overkings Bot For Farm Sirinks
## Можно запустить голосовой командой "ОКЕЙ, СИРИНКС, ФАРМ" ))))
## Бот написан для всех, кто не хочет тратить время на беспонотовый фарм, но + 50 алмазов не помешают, пока вы готовите ужин
Бот запускается командами:
```python
 node .\sirinks_farm.js V
 ```
 ```python
 node .\sirinks_farm.js F
 ```
 ```python
 node .\sirinks_farm.js H
 ```
 
 V - Vergerland (Zima1)
 F - Fiord (Zima2)
 H - Heimskringla (Zima3)
 
 Условия запуска:
 1. запускаете бота, у вас есть 10 секунд, чтобы алт-табнуться в Оверкингс
 2. быть героем в безопаске той зимы, которую фармите (Трорхейм, Эрлингард или Лагерь Кнуда)
 3. иметь камень телепортации - бот использует Телепорт
 4. активная рука 1
 
 ## Конфигурация скиллов и камня телепортации в config.cfg
 ```python
teleport=z+
sigil=9+
spell_1=1
```
У вас есть кнопки скиллов от 1 до 0, кнопка Х, кнопка С --- в игре при наведении на скилл это показывается
Соответственно первым делом ставим в конфиге свои параметры, главные это телепорт, сигил, и пару первых скиллов
Если скилл на ПЕРВОЙ РУКЕ, то просто "1", если на второй руке то ставим "1+"
Наличие или отсутствие "+", только параметр того, какую руку юзать
 
## Боссы 1й зимы с их координатами, сложностями в bosses.json
```python
	{
		"name": "MINGA",
		"mini_x": 0,
		"mini_y": 0,
		"map_x": 870,
		"map_y": 40,
		"confirm_x": 1100,
		"confirm_y": 250,
		"delay": 9,
		"stun_first_floor": 1,
		"stun_second_floor": 2,
		"first_floor_delay": 5,
		"second_floor_delay": 6,
		"extra_steps_first_floor": 18,
		"extra_steps_second_floor": 6
	},
```
параметры:

		"mini_x" - координата Х вашего экрана для перемещения курсора на мини-карте, для боссов которых видно при телепорте, она 0
		"mini_y" - координата Y вашего экрана для перемещения курсора на мини-карте, для боссов которых видно при телепорте, она 0
		"map_x" - координата Х вашего экрана локации босса, для боссов которые примо на этом месте, она 0 (Йурви)
		"map_y" - координата Y вашего экрана локации босса, для боссов которые примо на этом месте, она 0 (Йурви)
		"confirm_x" - координата Х вашего экрана локации босса, когда герой подошел к локе
		"confirm_y" - координата Y вашего экрана локации босса, когда герой подошел к локе
		"delay" - время в секундах, пока герой идет до локации
		"stun_first_floor" - цифра от 0 до 2, сложности первого этажа (больше сложность, больше заклинаний)
		"stun_second_floor" - цифра от 0 до 2, сложности второго этажа (больше сложность, больше заклинаний)
		"first_floor_delay" - задержка в секундах на автобой на первом этаже
		"second_floor_delay" - задержка в секундах на автобой на втором этаже
		"extra_steps_first_floor" - дополнительные движения герою по первому этажу (в локациях со станом и замедлением) 
		"extra_steps_second_floor" - дополнительные движения герою по второму этажу (в локациях со станом и замедлением) 
