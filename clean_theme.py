with open('css/main.css', 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.readlines()

# Filtrar líneas que NO contengan [data-theme
filtered = [line for line in lines if '[data-theme' not in line]

with open('css/main.css', 'w', encoding='utf-8') as f:
    f.writelines(filtered)

print(f"✅ Eliminadas todas las líneas con [data-theme")
