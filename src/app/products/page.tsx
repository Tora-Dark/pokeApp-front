"use client";
import ProductCard from "@/components/products/ProductCard";
import {  Card, CardBody} from "@nextui-org/card";
import axios from "axios";
import { useState, useEffect } from "react";
import {Tabs, Tab} from "@nextui-org/tabs";
import {Button } from "@nextui-org/button";

// URL API
const API_URL = process.env.PUBLIC_SERVER_URL;

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
}

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | number>("all");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  const fetchProducts = async (filters = {}) => {
    try {
      const response = await axios.get(`${API_URL}/products`, { params: filters });
      setProducts(response.data.result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategoriesAndTags = async () => {
    try {
      const categoriesResponse = await axios.get(`${API_URL}/categories`);
      setCategories(categoriesResponse.data.result);

      const tagsResponse = await axios.get(`${API_URL}/tags`);
      setTags(tagsResponse.data.result);
    } catch (error) {
      console.error("Error fetching categories and tags:", error);
    }
  };

  const handleFilterChange = () => {
    const filters: any = {};
    if (selectedCategory !== "all") filters.categoryId = Number(selectedCategory);
    if (selectedTags.length > 0) filters.tagIds = selectedTags;
    fetchProducts(filters);
  };

  useEffect(() => {
    fetchCategoriesAndTags();
    fetchProducts();
  }, []);

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategory, selectedTags]);

  const handleTagClick = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gradient-to-tr from-blue-500 to-red-500">
      <h1 className="text-3xl font-bold text-center mb-6">Nuestros Productos</h1>

      {/* Tabs de Categorías */}
      <div className="mb-4">
        <Tabs
          aria-label="Categories Tabs"
          selectedKey={selectedCategory}
          onSelectionChange={(key) => setSelectedCategory(key)}
        >
          <Tab key="all" title="All Categories">
            <Card>
              <CardBody>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id}>
                      <ProductCard
                        stock={product.stock}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        description={product.description}
                        imageUrl={product.imageUrl}
                      />
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </Tab>
          {categories.map((category) => (
            <Tab key={category.id.toString()} title={category.name}>
              <Card>
                <CardBody>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div key={product.id}>
                        <ProductCard
                          stock={product.stock}
                          id={product.id}
                          name={product.name}
                          price={product.price}
                          description={product.description}
                          imageUrl={product.imageUrl}
                        />
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Tab>
          ))}
        </Tabs>
      </div>

      {/* Select de Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <Button
            key={tag.id}
         /*    isGhost={!selectedTags.includes(tag.id)}
            isSolid={selectedTags.includes(tag.id)} */
            color={selectedTags.includes(tag.id) ? "primary" : "default"}
            onPress={() => handleTagClick(tag.id)}
          >
            {tag.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
