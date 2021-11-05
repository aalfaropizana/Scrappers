import requests
from bs4 import BeautifulSoup
import re

##título, autor, texto de artículo, fecha

categorias=['politica','deportes','seguridad','mundo','gente','historia-cultura']

def url_ok(url):
        ## help(url) para ver la documentacion
    """
        Te entrega el estatus de la url
        Args:
        param1 (srt): la url
        Returns:
        bool: true si es 200, false si es otro
    """
    r = requests.head(url)
    return r.status_code == 200

def url(categoria='politica',pagina=0):
    ## help(url) para ver la documentacion
    """
        Te entrega la url con la categoria que eligas halladas en la cabecera de la pagina
        Args:
        param1 (srt): categoria elegida
        param2 (int): la pagian de la categoria que desea ver
        Returns:
        str: te regresa la url
    """
    if(categoria=='opinion'):
        if(url_ok(f'http://www.oxigeno.bo/seccion/opinion?page={pagina}')):
            return f'http://www.oxigeno.bo/seccion/opinion?page={pagina}'
        else:
            return 'url desconectada'
    else:
        if(url_ok(f'http://www.oxigeno.bo/{categoria}?page={pagina}')):
            return f'http://www.oxigeno.bo/{categoria}?page={pagina}'
        else:
            return 'url desconectada'

def get_img(html):
    soup = BeautifulSoup(str(html), "html.parser")
    return soup.findAll('img')[0]['src']

def get_tag(html):
    soup = BeautifulSoup(str(html), "html.parser")
    if(soup.findAll('h5')):
        return soup.findAll('h5')[0].text.strip()
    else:
        return 'No tiene'

def get_titulo(html):
    soup = BeautifulSoup(str(html), "html.parser")
    return soup.findAll('a')[0].text.strip()

def get_link_titulo(html):
    soup = BeautifulSoup(str(html), "html.parser")
    pattern='(?<=\/)\d+'
    text=soup.findAll('a')[0]['href']
    num=re.search(pattern, text).group(0)
    return num

def get_fecha(html):
    soup = BeautifulSoup(str(html), "html.parser")
    for node in soup.findAll('div',{"class":'field-item even'}):
        text=node.getText()
        if(1<len(text)<20):
            return text

def get_previo(html):
    soup = BeautifulSoup(str(html), "html.parser")
    if(soup.findAll('span')):
        res=soup.findAll('span')[0].text.strip()
    else:
        res=soup.findAll('p')[0].text.strip()
    return res

def get_list_notes(url='http://oxigeno.bo/politica?page=0'):
    req = requests.get(url)
    soup = BeautifulSoup(req.text, "html.parser")
    lista= soup.findAll('div',{"class":'node node-noticia node-teaser view-mode-teaser'})
    #tam_lista=len(lista)
    res=[]
    if(lista):
        for x in lista:
            img=get_img(x)
            tag=get_tag(x)
            titulo=get_titulo(x)
            link_titulo=get_link_titulo(x)
            fecha=get_fecha(x)
            previo=get_previo(x)
            todo={'img':img,'tag':tag,'titulo':titulo,'link_titulo':link_titulo,'fecha':fecha,'previo':previo}
            #print(todo)
            res.append(todo)
        return res
    else:
        return {}

def get_texto_nota(html):
    soup = BeautifulSoup(str(html), "html.parser")
    for node in soup:
        text=node.getText().strip()
    return text

def get_autor_nota(html):
    soup = BeautifulSoup(str(html), "html.parser")
    ## Hay un caso donde cambian la fecha de lugar http://www.oxigeno.bo/seguridad/42329
    return soup.findAll('div',{"class":'field-item even'})[2].getText().strip()

def nota(url='http://oxigeno.bo/pol%C3%ADtica/42377'):
    req = requests.get(url)
    soup = BeautifulSoup(req.text, "html.parser")
    articulo=soup.findAll('div',{"class":'col-sm-9'})
    texto=get_texto_nota(articulo[0])
    navbar=soup.findAll('div',{"class":'col-sm-3'})
    autor=get_autor_nota(navbar[0])
    todo={'autor':autor,'texto':texto}
    return todo

categoria='seguridad' #all working except "historia-cultura" 
if(get_list_notes(url(categoria))):
    for x in get_list_notes(url(categoria)):
        url='http://oxigeno.bo/'+categoria+'/'+x['link_titulo']
        print(nota(url))
else:
    print('FATAL ERROR')