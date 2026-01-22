dias = 0
semana = 0
mes = 0

while True:
    try:
        menu = int(input("""
Digite a opção que você deseja:
    1. adicionar (Somar vários vídeos) 
    2. multiplicar (Descelerar o vídeo) 
    3. dividir (Acelerar o vídeo)
    4. subtrair (Ex: Quanto tempo falta?)\n"""))
        dias = int(input("Digite a quantidade de dias: "))
        horas = float(input("Digite uma quantidade de horas: "))
        minutos = float(input("Digite uma quantidade de minutos: "))
        segundos = float(input("Digite uma quantidade de segundos: "))
    except:
        print("Erro: digite novamente.")
        continue

    match menu:
        case 1:
            print("Adicionando com...")
            while True:
                try:
                    dias += int(input("Digite a quantidade de dias: "))
                    horas += float(input("Digite uma quantidade de horas: "))
                    minutos += float(input("Digite uma quantidade de minutos: "))
                    segundos += float(input("Digite uma quantidade de segundos: "))

                    continuar = input("Já adicionou o suficiente? (s)?").strip().lower()
                    if continuar == "s":
                        break
                except:
                    print("Erro: digite novamente.")
                    continue

        case 2:
            try:
                multiplicar = float(input("Digite por quanto você vai desejar multiplicar: "))
            except:
                print("Erro: digite novamente.")
                continue
            dias, horas, minutos, segundos = dias * multiplicar, horas * multiplicar, minutos * multiplicar, segundos * multiplicar

        case 3:
            try:
                dividir = float(input("Digite por quanto você vai desejar dividir: "))            
            except:
                print("Erro: digite novamente.")
                continue

            while True:
                if dias >= 1:
                    horas += 24
                    dias -= 1
                elif horas >= 1:
                    minutos += 60
                    horas -= 1
                elif minutos >= 1:
                    segundos += 60
                    minutos -= 1
                else:
                    break
            segundos = segundos / dividir 

        case 4:
            print("Subtraindo com...")
            try:
                rdias = int(input("Digite a quantidade de dias: "))
                rhoras = float(input("Digite uma quantidade de horas: "))
                rminutos = float(input("Digite uma quantidade de minutos: "))
                rsegundos = float(input("Digite uma quantidade de segundos: "))
            except:
                print("Erro: digite novamente.")
                continue

            # converter para segundos
            while True:
                if dias >= 1:
                    horas += 24
                    dias -= 1
                elif horas >= 1:
                    minutos += 60
                    horas -= 1
                elif minutos >= 1:
                    segundos += 60
                    minutos -= 1
                else:
                    break

            # converter para segundos, para depois subtrair        
            while True:
                if rdias >= 1:
                    rhoras += 24
                    rdias -= 1
                elif rhoras >= 1:
                    rminutos += 60
                    rhoras -= 1
                elif rminutos >= 1:
                    rsegundos += 60
                    rminutos -= 1
                else:
                    break
            
            segundos = segundos - rsegundos

    continuar = input("Quer continuar? (s)? ").lower().strip()
    if continuar == "s":
        break

while True:
    if segundos > 59:
        minutos +=1
        segundos -= 60
    elif minutos > 59:
        horas += 1
        minutos -= 60
    elif horas > 23:
        dias += 1
        horas -= 24
    elif dias > 6 :
        semana += 1
        dias -= 7
    elif semana >= 4:
        mes += 1
        semana -= 4
    else:
        break

total = f"{f"meses: {mes}," if mes else ""}{f"semanas: {semana}," if semana else ""}{f"dias: {dias}," if dias else ""}{f"horas: {horas}," if horas else ""}{f"minutos: {minutos}," if minutos else ""}{f"segundos: {segundos:.2f}" if segundos else ""}"

print(f"O total é: {total}")

