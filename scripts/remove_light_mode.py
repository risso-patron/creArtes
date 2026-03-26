with open('css/main.css', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

filtered_lines = []
skip_until_brace = False
brace_count = 0

for line in lines:
    # Si encontramos una línea con [data-theme="light"], empezamos a skipear
    if '[data-theme="light"]' in line:
        skip_until_brace = True
        brace_count = 0
        continue
    
    if skip_until_brace:
        # Contar llaves
        brace_count += line.count('{')
        brace_count -= line.count('}')
        
        # Si llegamos a 0 y hay una llave de cierre, terminamos de skipear
        if brace_count <= 0 and '}' in line:
            skip_until_brace = False
        continue
    
    # Si no estamos skipeando, agregamos la línea
    filtered_lines.append(line)

with open('css/main.css', 'w', encoding='utf-8') as f:
    f.writelines(filtered_lines)

print(f"✅ Modo light eliminado completamente del CSS")
