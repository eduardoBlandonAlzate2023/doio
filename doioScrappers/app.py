from scrappers.alkosto import alkostoScrapper
from scrappers.carulla import carullaScrapper
from scrappers.dafiti import dafitiScrapper
from scrappers.falabella import falabellaScrapper
from scrappers.gef import gefScrapper
from scrappers.homecenter import homecenterScrapper
from scrappers.mercadolibre import mercadolibreScrapper
from scrappers.panamericana import panamericanaScrapper
from scrappers.velez import velezScrapper
from dotenv import load_dotenv

load_dotenv("../.env")


def runScrapersAndCategories():
    products = (
        alkostoScrapper()
        + dafitiScrapper()
        + falabellaScrapper()
        + gefScrapper()
        + mercadolibreScrapper()
        + velezScrapper()
        + homecenterScrapper()
    )

    # pushToElasticSearch(products)
    # setCategories(products)
    # setProviders(products)


runScrapersAndCategories()
