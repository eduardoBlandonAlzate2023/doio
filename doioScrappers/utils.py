from elasticsearch import Elasticsearch
import os
from dotenv import load_dotenv
import time
from unidecode import unidecode
from elasticsearch.helpers import bulk

load_dotenv()

elasticsearchClient = Elasticsearch(os.getenv("ELASTICSEARCH_HOST"))

categoryMapping = {
    "deportes": [
        "gimnasio",
        "bicicleta",
        "accesorios deportivos",
        "camping",
        "disciplinas deportivas",
        "gimnasio en casa",
        "bicicletas",
    ],
    "moda": [
        "zapatos",
        "vestido",
        "set",
        "ropa_interior",
        "priceshoes",
        "bufanda",
        "zapatos",
        "moda",
        "sueco",
        "pijamas",
        "labial",
        "blusa",
        "enterizo",
        "bota",
        "blazer",
        "leggings",
        "vestuario",
        "body",
        "tenis mujer",
        "zapatos mujer",
        "ropa mujer",
        "ropa interior femenina",
        "bolsos y carteras",
        "accesorios mujer",
        "maquillaje",
        "ropa deportiva mujer",
        "ropa niñas",
        "buzos_chaquetas",
        "traje",
        "pantalones",
        "bermudas",
        "camisa",
        "tenis hombre",
        "ropa deportiva hombre",
        "ropa hombre",
        "ropa interior masculina",
        "zapatos hombre",
        "cuidado personal hombre",
        "hoodie",
        "saco",
        "camiseta",
        "zapatos",
        "jean",
        "zapato",
        "buzos chaquetas",
        "camisetas",
        "polos",
        "perfume",
        "anteojos",
        "pantalon",
        "tenis deportes",
        "sandalia",
    ],
    "electronica": [
        "televisor",
        "celular",
        "smart",
        "radio",
        "computadores y tablet",
        "accesorios de electronica",
        "portatil",
        "bateria",
        "tv y video",
        "buds",
        "celulares",
        "freidora",
        "accesorios celulares",
        "tv",
        "computadores",
        "gaming",
        "smartwatch",
        "fotografia",
        "parlantes",
        "audifonos",
        "telefonia",
        "wearables",
        "promociones electro",
    ],
    "hogar": [
        "lampara",
        "closet",
        "almohada",
        "toldo",
        "sofa",
        "griferia",
        "cubrelecho",
        "escritorio",
        "silla",
        "colchon",
        "edredon",
        "desagüe",
        "hogar",
        "baño crate and barrel",
        "cocina crate and barrel",
        "decoracion y cojines",
        "gourmet",
        "hogar inteligente",
        "electro cocina",
        "electro hogar",
        "neveras",
        "lavadoras",
        "cocinas",
        "climatizacion",
        "muebles",
        "muebles de sala",
        "muebles de terraza",
        "muebles de comedor",
        "muebles para niños",
        "muebles de oficina",
        "ropa de cama",
        "colchones",
        "complementos de cama",
        "camas",
        "ropa de cama juvenil",
        "muebles de dormitorio",
        "navidad",
        "cocina",
        "vajillas y cubiertos",
        "baño",
        "organizacion del hogar",
        "decoracion y cojines, marcas destacadas",
    ],
    "accesorios": [
        "reloj",
        "marcas accesorios",
        "accesorios hombre",
        "relojes",
        "billeteras y monederos",
        "gafas",
        "bisuteria y joyeria",
        "perfumes",
        "cuidado facial",
        "cuidado capilar",
        "dermocosmetica",
        "cuidado personal",
        "maletas de viaje",
        "movilidad",
    ],
    "niños": [
        "rodadero",
        "cuna",
        "moto",
        "coche",
        "juego",
        "juegos y juguetes",
        "mundo bebe",
        "juguetes de bebe",
        "juguetes",
        "carros a bateria y go karts",
        "juegos de exterior",
        "juegos de mesa",
        "ropa de cama infantil",
        "dormitorio infantil",
        "zapatos infantiles",
        "ropa niños",
        "lactancia y alimentacion",
        "coches para bebes",
        "cuidado y salud del bebe",
        "paseo y seguridad",
        "sillas infantiles",
        "ropa bebe",
    ],
    "musica": [
        "musica",
        "instrumentos musicales",
    ],
    "libros": [
        "escolar",
        "libros",
    ],
    "zapatos": [
        "tenis",
    ],
    "despensa": [
        "vinos y licores",
        "queso",
    ],
    "otros": [
        "caja",
        "soporte",
        "bomba",
        "marcas destacadas",
        "cabina",
        "anita",
        "banda",
        "hot",
        "kit",
        "koaj-estola",
    ],
}


def categoryConverter(category):
    normalizedCategory = unidecode(category.lower())
    for category, rawCategories in categoryMapping.items():
        if normalizedCategory in rawCategories:
            return category
    return normalizedCategory


def pushToElasticSearch(products):
    try:
        elasticsearchClient.indices.delete(index="products")
    except:
        pass
    actions = [
        {
            "_index": "products",
            "_source": product,
        }
        for product in products
    ]
    bulk(elasticsearchClient, actions)


def setCategories(products):
    elasticsearchClient.indices.delete(index="categories")
    elasticsearchClient.index(
        index="categories",
        document={"categories": list(set([item["category"] for item in products]))},
    )


def setProviders(products):
    elasticsearchClient.indices.delete(index="providers")
    for provider in list(set([item["provider"] for item in products])):
        elasticsearchClient.index(
            index="providers", document={"provider": provider, "count": 0}
        )
